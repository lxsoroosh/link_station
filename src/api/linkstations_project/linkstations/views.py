# linkstation_app/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from scipy.spatial import KDTree
import numpy as np

from linkstations.models import LinkStation
from linkstations.serializers import LinkStationSerializer


# Let's assume we have a method 'power' in the LinkStation model that calculates power based on distance

class LinkStationView(APIView):
    def post(self, request):
        serializer = LinkStationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        station_id = request.query_params.get('id')
        if not station_id:
            return Response({'error': 'Station ID not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            station = LinkStation.objects.get(pk=station_id)
            station.delete()
            return Response({'message': 'Link station deleted successfully.'}, status=status.HTTP_200_OK)
        except LinkStation.DoesNotExist:
            return Response({'error': 'Link station not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        device_x = request.query_params.get('x')
        device_y = request.query_params.get('y')
        fetch_stations = request.query_params.get('fetch_stations', None)

        if fetch_stations:
            stations = LinkStation.objects.all()
            serializer = LinkStationSerializer(stations, many=True)
            return Response(serializer.data)

        if device_x is None or device_y is None:
            return Response({'error': 'Coordinates not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            device_x = float(device_x)
            device_y = float(device_y)
        except ValueError:
            return Response({'error': 'Invalid coordinates supplied.'}, status=status.HTTP_400_BAD_REQUEST)

        result = self.find_best_link_station(device_x, device_y)

        if result:
            best_station, best_power = result
            serializer = LinkStationSerializer(best_station)
            return Response({'station': serializer.data, 'power': best_power})
        else:
            return Response({'message': f'No link station within reach for point ({device_x}),({device_y})'})

    def find_best_link_station(self, device_x, device_y):
        stations = LinkStation.objects.all()
        if not stations:
            return None

        coordinates = [(station.x, station.y) for station in stations]
        kdtree = KDTree(coordinates)
        reaches = [station.reach for station in stations]
        max_reach = max(reaches)
        indices = kdtree.query_ball_point([device_x, device_y], max_reach)

        stations_within_reach = []
        for i in indices:
            distance = np.hypot(stations[i].x - device_x, stations[i].y - device_y)
            if distance <= stations[i].reach:
                power = stations[i].power(distance)
                stations_within_reach.append((stations[i], power))

        if stations_within_reach:
            best_station, best_power = max(stations_within_reach, key=lambda x: x[1])
            return best_station, best_power
        return None

from rest_framework import serializers

from linkstations.models import LinkStation

class LinkStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkStation
        fields = ['id', 'x', 'y', 'reach']

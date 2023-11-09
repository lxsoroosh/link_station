# linkstation_app/urls.py
from django.urls import path

from linkstations.views import LinkStationView

urlpatterns = [
    path('find_best_station', LinkStationView.as_view(), name='find_best_station'),
]

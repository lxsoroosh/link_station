from django.db import models


class LinkStation(models.Model):
    x = models.FloatField()
    y = models.FloatField()
    reach = models.FloatField()

    def power(self, distance):
        # The same logic as your plain Python class
        if distance > self.reach:
            return 0
        return (self.reach - distance) ** 2

    def __str__(self):
        return f"LinkStation({self.x}, {self.y}, {self.reach})"

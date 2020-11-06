from django.db import models
from project.apps.core.models import TimeStampedModel


class Annotation(TimeStampedModel):
    title = models.CharField(max_length=100)
    description = models.TextField()
    # 1 for red, 2 for orange and 3 for green
    priority = models.PositiveSmallIntegerField()
    
    
    def __str__(self):
        return f"{self.title} - {self.description}"

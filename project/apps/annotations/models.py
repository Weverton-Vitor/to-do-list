from django.db import models
from project.apps.core.models import TimeStampedModel


class Annotation(TimeStampedModel):
    title = models.CharField("Título", max_length=40)
    description = models.TextField("Descrição")
    # 1 for red, 2 for orange and 3 for green
    priority = models.PositiveSmallIntegerField("Proridade")
    is_trash = models.BooleanField(default=False)
    
    
    def __str__(self):
        return f"{self.title} - {self.description}"

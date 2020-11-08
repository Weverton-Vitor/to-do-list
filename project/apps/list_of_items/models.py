from django.db import models
from project.apps.core.models import TimeStampedModel


class TaskList(TimeStampedModel):
    title = models.CharField(max_length=100)
    is_trash = models.BooleanField()
    
    
    def __str__(self):
         return self.title


class TaskListItem(models.Model):
    task_list = models.ForeignKey(to=TaskList, on_delete=models.CASCADE)
    description = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.task_list.title} - {self.description}"

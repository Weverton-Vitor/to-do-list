import os
import django
import random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
django.setup()

from project.apps.list_of_items.models import TaskList, TaskListItem
from project.apps.annotations.models import Annotation

# Delete all
Annotation.objects.all().delete()
TaskList.objects.all().delete()
TaskListItem.objects.all().delete()

# Create Annotations
description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

annotations = [
    Annotation(
        title=f'Annotation {x}',
        description=description,
        priority=random.choice([1, 2, 3])
    ) for x in range(1, 21)
]

Annotation.objects.bulk_create(annotations)

# Create TaskList
lists = [TaskList(title=f'List {x}') for x in range(1, 21)]
TaskList.objects.bulk_create(lists)

# Create TaskListItem
lists = TaskList.objects.all()
for task_list in lists:
    task_list_items = []
    for i in range(1, 11):
        task_list_item = TaskListItem(
            id=None,
            task_list=task_list,
            description=f'{task_list.title} - item {i}'
        )
        task_list_items.append(task_list_item)

    TaskListItem.objects.bulk_create(task_list_items)

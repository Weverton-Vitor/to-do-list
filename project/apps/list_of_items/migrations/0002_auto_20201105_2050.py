# Generated by Django 3.1.3 on 2020-11-05 23:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('list_of_items', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tasklistitem',
            old_name='descrition',
            new_name='description',
        ),
    ]

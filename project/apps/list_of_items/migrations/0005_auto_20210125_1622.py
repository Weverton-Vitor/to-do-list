# Generated by Django 3.1.3 on 2021-01-25 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('list_of_items', '0004_auto_20210125_1622'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tasklist',
            name='title',
            field=models.CharField(max_length=40, verbose_name='Título'),
        ),
    ]
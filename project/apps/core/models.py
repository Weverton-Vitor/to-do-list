from django.db import models

class TimeStampedModel(models.Model):
    created = models.DateTimeField(
        'criate_at',
        auto_now_add=True,
        auto_now=False
    )

    modified = models.DateTimeField(
        'update_at',
        auto_now_add=False,
        auto_now=True
    )

    class Meta:
        abstract = True

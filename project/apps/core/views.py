from django.shortcuts import render
from django.views.generic.base import RedirectView

class index(RedirectView):
    pattern_name = 'annotations:annotation_list'


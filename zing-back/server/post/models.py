from django.db import models


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='post_images',max_length=1000)
    body = models.TextField(blank=True, default='')
    user = models.ForeignKey('users.Users', related_name='posts', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f"Post by {self.user}"
# from django.db import models
#
# from comment.models import AbstractComment
# from users.models import Users
# from mptt.models import MPTTModel
#
#
# class Post(models.Model):
#     text = models.TextField(max_length=1000)
#     create_date = models.DateTimeField(auto_now_add=True)
#     author = models.ForeignKey(Users, on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='post_image')
#
#     def __str__(self):
#         return f"Post by {self.author}"
#
#
# class Comment(AbstractComment, MPTTModel):
#     """ Модель коментариев к постам
#     """
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
#     parent = TreeForeignKey(
#         "self",
#         on_delete=models.SET_NULL,
#         null=True,
#         blank=True,
#         related_name='children'
#     )
#
#     def __str__(self):
#         return "{} - {}".format(self.user, self.post)
#
# #
# # class Comment(AbstractComment):
# #     user = models.ForeignKey(Users, on_delete=models.CASCADE)
# #     post = models.ForeignKey(Post, on_delete=models, related_name='comments')
#

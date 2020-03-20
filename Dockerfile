FROM nginx
COPY docs/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
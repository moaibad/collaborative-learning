# Prerequisite
+ create ```DATABASE_URL``` to mysql in ```.env```, change port if mysql not at ```3307```
```.env
DATABASE_URL="mysql://{db_username}:{db_password}@localhost:3307/colle"
```
for example username="root" password=""
```.env
DATABASE_URL="mysql://root:@localhost:3307/colle"
```



# migrate to database
+ run ```npm install -g prisma```
+ run ```npx prisma migrate dev --name init```

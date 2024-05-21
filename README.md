
# Remix Application

A Remix.run full-stack Application that can be used to to add Products and their Categories.

## Setup Instructions

Clone the Repository
```
git clone https://github.com/nousheenali/Coding_Challenge_Software_Engineer_application_by_Nousheen_Ali.git Project
```


Change to Remix Application directory and place the .env file.

```
cd Project/RemixApp/
```
The environment variables required are:
```
#Database Environment Variables
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=

#prisma
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}?schema=public"

#cloudinary
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

Run the docker compose file
```
docker-compose up -d
```

Migrate prisma. Install Node Modules and run the Application
```
sudo npm install
sudo npm run dev
```

To migrate Prisma and Run Prisma Studio
```
npx prisma migrate dev --name init
npx prisma studio
```


REFERENCES:

[FULLSTACK APP WITH REMIX](https://youtube.com/playlist?list=PLn2e1F9Rfr6kPDIAbfkOxgDLf4N3bFiMn&si=IjPtKxl_lv2bw3Fu)

[CLOUDINARY FILE UPLOAD](https://github.com/remix-run/examples/blob/main/file-and-cloudinary-upload/app/routes/cloudinary-upload.tsx)



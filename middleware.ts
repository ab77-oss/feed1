export { default } from "next-auth/middleware"
//middleware  used to authenticate requests for the paths "/trips", "/reservations", "/properties", and "/favorites"
export const config = { 
  matcher: [
    "/comments",
    "/feedbackclient",

  ]
};

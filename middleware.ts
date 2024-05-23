export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/favorites",
        "/selfPost",
        "/conversations",
        "/conversations/:path*",
    ]
}
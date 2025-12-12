# Ensure
https://henrygilchrist.github.io/Ensure/

## Customer Review API
•	Customer reviews retrieved from Postgres. URL query string handling enables sorting, filtering and pagination.
•	Postgres queries are parametrized: No SQL injection.
•	Once logged in: can post, update and delete reviews. 
•	Secured authentication by issuing JWT tokens via   HTTP-only cookies:  Reducing exposure to XSS credential theft.
•	Due to hosting on Vercel: CSRF was a vulnerability. Addressed this by flagging access tokens issued at login, enabling sensitive operations to enforce re-authentication for refreshed access tokens.

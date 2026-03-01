# **App Name**: Daily DataID

## Core Features:

- Daily Persistent Token Generation: A server-side API endpoint that generates a unique 15-character alphanumeric token based on the current UTC date, ensuring the same token is returned for all requests on a given day.
- Current Date Retrieval: The server-side API also determines and returns the current date along with the generated token.
- Automatic Client-Side Fetching: Upon opening the web application, the client automatically makes a request to the server API to fetch the daily token and date, without any user interaction or 'generate' button.
- Clean Token and Date Display: A minimalist user interface to prominently display the automatically generated 15-character token and the corresponding date in a clear, readable format.
- Data Raw type page: Displays the raw data type of the generated token and date.

## Style Guidelines:

- Primary color: A sophisticated, slightly desaturated blue-purple (#514299) reflecting data integrity and calmness for interactive elements and prominent text.
- Background color: A very light, subtle lilac-grey (#F2EFF5) providing a clean and understated backdrop.
- Accent color: A vibrant yet analogous blue (#5C91DA) for highlighting the token, emphasizing the automatically generated output.
- Main font: 'Inter' (sans-serif) for all text, chosen for its modern, objective, and highly readable qualities, suitable for displaying data consistently across devices.
- Centralized, minimalist layout focusing on displaying the generated token and date prominently in the center of the screen with ample whitespace.
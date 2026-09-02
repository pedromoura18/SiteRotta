<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading...</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100vh;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <iframe id="contentFrame" src="https://app.emergent.sh/loading-preview?host=rotta-redesign.preview.emergentagent.com" allowfullscreen></iframe>
    <script>
        // Listen for messages from the iframe
        window.addEventListener('message', function(event) {

        	console.log(event.origin);
            // Optional: Add origin check for security
            // if (!['https://dev.emergentagent.com', 'https://app.emergent.sh'].includes(event.origin)) return;

            if (event.data && event.data.type === 'reload') {
                const iframe = document.getElementById('contentFrame');
                window.location.reload();
            }

            if (event.data && event.data.type === 'url') {
                const iframe = document.getElementById('contentFrame');
                window.open(event.data.url, '_blank');
            }
        });
    </script>
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js/v3d52b47920f24c319d37e2661827c42b1787588026925" integrity="sha512-d9sL6GJLXn6fInD1+TVXhTcQOsmxeHfmHAvwGDIxp5TO+uo1fiWW7mHomMj4MLRlCsJDTqXzWLHJFFlPCEIj/A==" data-cf-beacon='{"version":"2024.11.0","token":"7f7b0fd8732c4326aae4b9d58d5c514a"}' crossorigin="anonymous"></script>
</body>
</html>
# Data Collection

## Pull data from Spotify WebAPI

### Get the access token

```bash
curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=4b3d49bbd0344789bac30c95b8f2626c&client_secret=d0ab06b7de4b4af3a9a999d125aaa451"
```

### Results

```json
{
  "access_token": "BQDDU9jtbKnMEhqPIERsAaiBgkAdvWDwP6EI8AosZG8WpY10clhZ9r_YtozIPHQgo8wvdSs6IxvTxfN6Aa78CSzLSBsVEZYc5QC3OOpm_OKp-62Uq0M",
  "token_type": "Bearer",
  "expires_in": 3600
}
```


import pandas as pd

# Load the dataset
file_path = 'Bitcoin Historical Data3.csv'
data = pd.read_csv(file_path)

# Handling missing values for 'Vol.'
# Initial attempt to convert 'K', 'M', and 'B' to their numeric equivalents failed due to a 'B' value
# Correctly handling the conversions
data['Vol.'] = data['Vol.'].str.replace('K', 'e3').replace('M', 'e6').replace('B', 'e9')
data['Vol.'] = data['Vol.'].str.extract('([0-9.]+)')[0].astype(float) * \
               data['Vol.'].str.extract('([e0-9]+)$')[0].astype(float).fillna(1)

# Calculate the mean for 'Vol.' excluding NaNs
vol_mean = data['Vol.'].mean()

# Replace missing values with the mean
data['Vol.'] = data['Vol.'].fillna(vol_mean)

# Trimming extra spaces in string columns
for col in data.select_dtypes(include=['object']).columns:
    data[col] = data[col].str.strip()

# Converting date columns to a consistent format (if applicable)
if 'Date' in data.columns:
    data['Date'] = pd.to_datetime(data['Date']).dt.strftime('%Y-%m-%d')

# Convert the date column to str
data['Date'] = data['Date'].astype(str)
# Save the cleaned dataset
cleaned_file_path_final = 'cleaned_data.csv'
data.to_csv(cleaned_file_path_final, index=False)

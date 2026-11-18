# Bin Buddy

A simple Android application built with React Native and Expo that displays upcoming bin collection dates for a property in North Northamptonshire.

The app retrieves live collection information from the North Northamptonshire Council collection service and presents it in a clean mobile-friendly interface.

## Features

- Live bin collection data
- Next collection hero card
- Recycling and refuse identification
- Days remaining countdown
- Dark mode interface
- Android support via Expo

## Screenshots

_To be added_

## Technology Stack

- React Native
- Expo
- TypeScript
- North Northamptonshire Council API

## Project Structure

```text
app/
├── index.tsx        Main application screen
assets/
README.md
app.json
```

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

Open using:

- Expo Go (Android)
- Android Emulator
- Web Browser

## Building APK

```bash
eas build --platform android
```

## Current Status

### Version 1.0

- ✅ Council API integration
- ✅ Hero card showing next collection
- ✅ Collection countdown
- ✅ Dark UI theme
- ✅ Upcoming collection list

## Future Features

### Notifications

Send a notification the evening before collection reminding the user which bin should be put out.

Example:

```text
Bin Collection Tomorrow

Put out your Recycling bin tonight
```

### Light and Dark Theme Support

Automatically switch between light and dark mode using the device system settings.

### Pull to Refresh

Allow the collection schedule to be refreshed manually.

### Home Screen Widget

Android widget displaying the next collection without opening the app.

### Multiple Properties

Support multiple UPRNs and switching between addresses.

### Collection History

View previously completed collections.

## Author

Elton Peake

## License

Personal project.
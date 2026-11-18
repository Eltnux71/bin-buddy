# Bin Buddy

A simple Android application built with React Native and Expo that displays upcoming bin collection dates for a property in North Northamptonshire.

The app retrieves live collection information from the North Northamptonshire Council collection service and presents it in a clean mobile-friendly interface.

## Features

- Live bin collection data from North Northamptonshire Council
- Highlights the next collection
- Recycling and refuse identification
- Days remaining countdown
- Dark mode friendly interface
- Automatic collection reminders
- Local notification support
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

### Version 1.1

- ✅ Council API integration
- ✅ Hero card showing next collection
- ✅ Collection countdown
- ✅ Dark UI theme
- ✅ Upcoming collection list
- ✅ Dynamic 30 day collection window
- ✅ Collection reminder notifications

## Future Features

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

## Version History

### v1.1.0

- Added collection reminder notifications
- Added automatic 30-day collection lookup window
- Improved notification handling

### v1.0.0

- Initial release
- Collection dashboard
- Hero card
- Days remaining countdown
- Council API integration

## Author

Elton Peake

## License

Personal project.
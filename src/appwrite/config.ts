export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
  appointmentsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENTS!,
  apiKey: process.env.APPWRITE_API_KEY!,
}

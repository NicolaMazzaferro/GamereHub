export default function getProfileImg(fileUrl) {
  if (!fileUrl) {
    return '';
  }


  if (fileUrl.includes('https://cdn.discordapp.com/avatars/')) {
    return fileUrl; 
  }

  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileUrl}`;
}

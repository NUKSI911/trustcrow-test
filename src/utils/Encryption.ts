import forge from "node-forge";

type EncryptionDataType = {
  PUBLIC_KEY: string;
  user_id: string;
  channel_name: string;
  channel_pass_key: string;
  replay_self?: string;
};

function messageEncryption({
  PUBLIC_KEY,
  user_id,
  channel_name,
  channel_pass_key,
  replay_self,
}: EncryptionDataType) {
  const replay = replay_self !== undefined ? `&replay_self=${replay_self}` : "";
  const encodedToken = `user_id=${user_id}&channel=${channel_name}&channel_pass_key=${channel_pass_key}${replay}`;
  const publicKey = forge.pki.publicKeyFromPem(PUBLIC_KEY);
  const encryptedToken = publicKey.encrypt(encodedToken, "RSA-OAEP", {
    md: forge.md.sha256.create(),
  });
  const base64EncodedEncryptedToken = forge.util
    .encode64(encryptedToken)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${user_id}/${channel_name}?encrypted_token=${base64EncodedEncryptedToken}${replay}`;
}

export default messageEncryption;

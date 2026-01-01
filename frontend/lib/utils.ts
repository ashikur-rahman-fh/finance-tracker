export const getPostUpdateUri = (uri : string) : string => {
  const uriTokens = uri.split("/");
  const wantedTokens = uriTokens.slice(0, -1);
  return wantedTokens.join("/");
};

export const getPostDeleteUri = (uri : string) : string => {
  const uriTokens = uri.split("/");
  const wantedTokens = uriTokens.slice(0, -1);
  return wantedTokens.join("/");
};

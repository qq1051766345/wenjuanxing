const KEY = 'user-token';
const USERINFO_KEY = 'user-info';

export function setToken(token: string): void {
  localStorage.setItem(KEY, token);
}

export function getToken() {
  return localStorage.getItem(KEY);
}

export function removeToken() {
  localStorage.removeItem(KEY);
}

export function setUserInfoToLocal(data: any): void {
  localStorage.setItem(USERINFO_KEY, JSON.stringify(data));
}

export function removeUserInfo(): void {
  localStorage.removeItem(USERINFO_KEY);
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(USERINFO_KEY)!) || {};
}

// 手机号脱敏
export const mobileEncrypt = (val: string): string => {
	if (!val) return '';
	return val.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
};

// 身份证脱敏
export const idEncrypt = (val: string): string => {
	if (!val) return '';
	return val.replace(/(\w{6})\w*(\w{3})/, '$1*******$2');
};

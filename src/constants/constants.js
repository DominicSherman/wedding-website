export const DEV = 'dev';
export const PROD = 'prod';
export const reverseEnum = {
    [PROD]: DEV,
    [DEV]: PROD
};
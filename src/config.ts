export interface IConfig {
  appId: string;
  appSecret: string;
  nonceStr: string;
}

const config: IConfig = {
  appId: '',
  appSecret: '',
  nonceStr: 'tsnodeblog',
};

export { config };
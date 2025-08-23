export interface Health {
  status: string;
}

export interface Info {
  build: {
    artifact: string;
    name: string;
    time: string;
    version: string;
    group: string;
  };
}
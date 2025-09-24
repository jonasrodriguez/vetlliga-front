const appVersion = __APP_VERSION__;

function VersionTooltip() {

  return (
    <div>
      Version frontend: {appVersion}
      <br />
      Version backend: ...
    </div>
  );
};

export default VersionTooltip;

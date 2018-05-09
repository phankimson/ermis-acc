var Client = function () {
  return {
      connect : function (channel) {
        const io = adonis.Ws().connect()
        const client = io.subscribe(channel)

        client.on('ready', () => {

        })

        client.on('error', (error) => {
          kendo.alert(error);
          return
        })

        client.on('close', () => {

        })
        return client
      },
  };
}();

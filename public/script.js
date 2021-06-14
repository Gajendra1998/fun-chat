const socket =io('/')
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
console.log(videoGrid);
myVideo.muted = true;

var peer = new Peer()
let myVideoStream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio:false

}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on('call',call=>{
        call.answer(stream)
        const video =document.createElement('video')
        call.on('stream',userVideoStream=>{
            addVideoStream(video,userVideoStream)
        })
    })
    socket.on('user-connected',(userId)=>{
     connecToNewUser(userId,stream);
    })
})
peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id);
})
const connecToNewUser=(userId,stream)=>{
    console.log(userId);
    const call = peer.call(userId,stream)
    const video =document.createElement('video')
    call.on('stream',userVideoStream=>{
        addVideoStream(video,userVideoStream)
    })
}
const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = function(e) {
        
        video.play();
      };
    videoGrid.append(video);
}
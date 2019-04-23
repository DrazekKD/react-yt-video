import React from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail'
const key = 'AIzaSyDElfgVT1ZicBvQeeQ0hO1vZ1CeUikRjQU';

class App extends React.Component{
    state = {videos: [], selectedVideo: null};

    onTermSubmit = async (term) =>{
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${key}&q=${term}`);
        const data = await response.json();
        this.setState({videos: data.items});

    }

    onVideoSelect = (video) => {
        this.setState({selectedVideo: video});
    }

    render(){
        return(
            <div className='ui container'>
                <SearchBar onFormSubmit={this.onTermSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default App;
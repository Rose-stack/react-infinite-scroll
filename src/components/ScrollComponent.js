import React, { Component } from 'react';

//third-party
import axios from 'axios';



class ScrollComponent extends Component {

    state = {
        photos: [],
        loading: false,
        page: 0,
        prevY: 0
    };

    async componentDidMount() {
        await this.getPhotos(this.state.page);
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        this.observer = new IntersectionObserver(this.handleObserver, options);
        this.observer.observe(this.loadingRef);
    }

    handleObserver = (entities, observer) => {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            let lastPhoto = this.state.photos[this.state.photos.length - 1];
            const curPage = lastPhoto['albumId'];

            //hold last page being scrolled based on the current page

            //then fetch the data from the server
            this.getPhotos(curPage);

            this.setState({ page: curPage });
        }
        this.setState({ prevY: y })
    }

    //getting the photos
    getPhotos = async (page) => {

        this.setState({ loading: true });
        let response = await axios
            .get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=30`)
            .catch(console.log);

        //set the state.
        return this.setState({
            photos: [...this.state.photos, ...response.data],
            loading: false
        });

    }

    render() {

        //css
        const loadingCss = {
            height: "100px",
            margin: "30px"
        };

        //changing the loading icon behavior
        const loadingTextCss = { display: this.state.loading ? 'block' : 'none' };
        return (
            <div className="container">
                <div style={{ minHeight: '800px' }}>
                    {
                        this.state.photos.map((user => (
                            <img src={user['url']} height="100px" width="200px" alt="" />
                        )))
                    }
                </div>
                <div
                    ref={loadingRef => this.loadingRef = loadingRef}
                    style={loadingCss}
                >
                    <span style={loadingTextCss}>Loading...</span>
                </div>
            </div>
        )
    }
};

export default ScrollComponent;
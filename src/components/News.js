import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import Koala from './Koala.png'



export class News extends Component {

  static defaultProps = {
    pageSize: 6,
    category: 'general',
  }




  articles = [
    {
      "source": { "id": "financial-times", "name": "Financial Times" },
      "author": "Claire Bushey, James Politi, Colby Smith",
      "title": "Joe Biden urges UAW and carmakers to resume negotiations to end strike - Financial Times",
      "description": "White House sends top aides to mediate as GM boss hits out at union’s rejection of ‘historic’ offer",
      "url": "https://www.ft.com/content/f5f280d2-3e8d-44b1-b259-52cbbb64347b",
      "urlToImage": "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fwww.ft.com%2F__origami%2Fservice%2Fimage%2Fv2%2Fimages%2Fraw%2Fhttps%253A%252F%252Fd1e00ek4ebabms.cloudfront.net%252Fproduction%252F041af4aa-33c2-4b9f-a463-dd8fb9796303.jpg%3Fsource%3Dnext-article%26fit%3Dscale-down%26quality%3Dhighest%26width%3D700%26dpr%3D1?source=next-opengraph&fit=scale-down&width=900",
      "publishedAt": "2023-09-15T18:21:06Z",
      "content": "US president Joe Biden has directed two top White House officials to mediate talks between Detroits Big Three carmakers and the autoworkers union as he urged the sides to find a deal that would end a… [+4213 chars]"
    }
  ]

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 

  async componentDidMount() {
    this.props.setprogress(10);
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=1da9fe68286548bba82706aac251a846&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    await this.setState(this.articles = parsedData.articles);
    this.setState({ loading: false })
     this.setState({ totalResults: parsedData.totalResults });
    
    console.log(this.state.totalResults)
    this.props.setprogress(100);
  }

 
  fetchMoreData =  () => {
    this.setState({ page: this.state.page + 1 })
    this.setState({ loading: true })
    console.log(this.state.page)
    setTimeout( async() => {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=1da9fe68286548bba82706aac251a846&pageSize=${this.props.pageSize}&page=${this.state.page}`;
      let data = await fetch(url);
      let parsedData = await data.json();
     console.log(parsedData.articles)
      await this.setState(this.articles = this.articles.concat(parsedData.articles));
      this.setState({ loading: false })
      console.log(this.articles.length)
      console.log(this.articles)
      
      console.log(this.state.page)
    }, 1000);
     
    
    
  };


  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults : 0,
    }
    if (this.props.category !== 'general') {
      document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsKoala`
    }
    else {
      document.title = 'NewsKoala | Get latest news from all around the globe'
    }
  }

  render() {
    return (
      <>
        <div className="container" style={{marginTop:'80px'}}>

          <h1 className='my-2' style={{ textAlign: 'center' }}>
            <img className='mx-2' src={Koala} alt="koala" style={{width:'100px'}}/>
            NewsKoala - Latest {this.capitalizeFirstLetter(this.props.category)} News</h1>

        </div>
         
          
          <InfiniteScroll
            dataLength={this.articles.length}
            next={this.fetchMoreData}
            hasMore={this.articles.length<this.state.totalResults-1}
            loader={<Spinner/>}>
          <div className="container my-4">
          <div className="row">
            {this.articles.map((element) => {
              return <div className="col-md-03 mx-4 my-3" key={element.url}>
                <NewsItem title={element.title===null?'No Title':element.title} desc={element.description !== null ? element.description.slice(0, 80) : "No Description Available"} imgUrl={element.urlToImage === null ? 'https://image.cnbcfm.com/api/v1/image/102079128-1539342565979105501689.jpg?v=1694819350&w=1920&h=1080' : element.urlToImage} newsUrl={element.url} author={element.author === null ? 'Unknown Author' : element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
          </InfiniteScroll>
        
        
      </>
    )
  }
}

export default News

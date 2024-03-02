import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, desc, imgUrl, newsUrl, author, date , source } = this.props;
    return (
      <>
        <div className="card" style={{ width: "20rem" }}>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-light">
            {source===null?'Unknown Source':source}

          </span>
          <img
            className="card-img-top text-center"
            src={imgUrl}
            alt=" Not able to Load"
            style={{ height: "175px" }}
          />

          <div className="card-body">
            <h5 className="card-title" style={{ height: "110px" }}>
              {title}
            </h5>
            <p className="card-text" style={{ height: "80px" }}>
              {desc}...
            </p>
            <div className="my-2" style={{height:"60px"}}>
              <small className="text-muted" >
                By {author} on {new Date(date).toUTCString()}
              </small>
            </div>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-info"
            >
              Read More
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;

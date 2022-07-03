const DoctorsList = ({ list, title, subtitle }) => {
  return (
    <div className="meet-specialists m-0 p-0">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="main-title">
              <h2>
                <div dangerouslySetInnerHTML={{__html: title}}/>
              </h2>
              {/* <p>
                {subtitle}
              </p> */}
            </div>
          </div>
        </div>

        <div className="row d-flex flex-wrap justify-content-center">
          {/* <div className="container"> */}
            {/* <div className="row"> */}
              {/* <div className="span12"> */}
                {/* <div id="owl-demo4" className="owl-carousel"> */}
                  {list && list.map((teamMember) => (
                    <div className="post item m-1" style={{maxWidth: "20rem"}}>
                      <div className="gallery-sec">
                        <div className="image-hover img-layer-slide-left-right">
                          <img
                            src={teamMember.img}
                            alt=""
                          />
                          <div className="layer">
                            <div style={{color: "white", fontSize: 24, whiteSpace: "break-spaces"}}>{teamMember.body}</div>
                          </div>
                        </div>
                      </div>

                      <div className="detail">
                        <h4>{teamMember.title}</h4>
                        {/* <span>{teamMember.body}</span> */}
                        {/* <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec nec eros eget nisl fringilla commodo.
                        </p>
                        <a href="team-member-detail.html">- View Profile</a> */}
                      </div>
                    </div>
                  ))}
                {/* </div> */}
              {/* </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;

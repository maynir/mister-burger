import './OurLifestyle.scss';

const fileNames = ["86330005", "86330011", "86330023", "86330035", "IMG_0328", "IMG_0330", "IMG_0333", "IMG_0334", "IMG_0335", "IMG_0338", "IMG_0341", "IMG_0342", "IMG_0343", "IMG_0347", "IMG_0348", "IMG_0354", "IMG_0359", "IMG_0371", "IMG_0380", "IMG_0387", "IMG_0388", "IMG_0389", "IMG_0392", "ebfefb6f-8472-4da4-b134-523e7ee6244b"];

const OurLifestyle = () => {
  return (
    <div className="OurLifestyle" id="OurLifestyle">
      <div className='main-text'>
        Join our team, join <span className='big'>OUR LIFESTYLE</span>.
      </div>
      <div className='sub-text'>
        MisteR Burger Shop
      </div>

      <div className='gallery'>
        {fileNames.map(file => <img src={`films/${ file }.jpeg`} alt={file} key={file} />)}
      </div>
    </div>
  );
}

export default OurLifestyle;

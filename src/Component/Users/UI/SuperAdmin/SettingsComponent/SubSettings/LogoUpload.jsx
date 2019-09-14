import React, {Component} from 'react';
import ImgCrop from "antd-img-crop";
import { Upload, Icon, message } from "antd";
import "antd/dist/antd.css";

const styleSheet = {
    dropzone: {
        backgroundColor: '#fcfcfc',
        height: '200px',
        color: '#000000',
    }
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

export default class LogoUpload extends Component {

    state = {
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
            // var file = [this.state.imageUrl];

            // axios.post('http://localhost:8080/uploadimage',{
            //     url: file
            // })
            // .then(function (response) {
            //     console.log(response)
            // })
            // .catch(function (error) {
            //     console.log(error)
            // });
        }

        console.log(this.state.imageUrl)
    };

    render(){

        const uploadButton = (
            <div className="plusbtn">
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          const { imageUrl } = this.state;

        return(
            <div>
                <div className='dropzone bg-white' style={{margin: '20px'}}>
                    <div className="imageupload">
                        <ImgCrop width={250} height={75}>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </ImgCrop>
                    </div>
                </div>
            </div>
        )
    }
}
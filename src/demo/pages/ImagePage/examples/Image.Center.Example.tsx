import * as React from 'react';
import {
  Image,
  IImageProps,
  ImageFit
} from '../../../../index';

export class ImageCenterExample extends React.Component<any, any> {
  public render() {
    let imageProps: IImageProps = {
      src: 'http://placehold.it/700x300',
      imageFit: ImageFit.center,
      width: 350,
      height: 150
    };

    return (
      <Image  { ...imageProps } />
    );
  }
}
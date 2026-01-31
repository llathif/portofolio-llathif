import Spline from '@splinetool/react-spline';
import './Lanyard.css';

export default function Lanyard() {
  return (
    <div className="lanyard-wrapper" style={{ width: '100%', height: '500px', position: 'relative' }}>
      <Spline scene="https://prod.spline.design/CQmZIG91HnmBoqyB/scene.splinecode" />
    </div>
  );
}

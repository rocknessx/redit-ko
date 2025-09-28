import { Devvit } from '@devvit/public-api';

Devvit.addMenuItem({
  label: 'Knight Plus Game',
  location: 'post',
  onPress: (event, context) => {
    context.ui.showToast('Knight Plus Game başlatıldı!');
  },
});

export default Devvit;
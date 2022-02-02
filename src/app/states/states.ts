import { AuthState } from './auth/auth.state';
import { PageState } from './pages/pages.state';
import { NavigationState } from './navigation/navigation.state';
import { UsersState } from './users/users.state';
import { UsersSecurityState } from './users-security/users-security.state';
import { PostState } from './posts/posts.state';
import { ImagesState } from './images/images.state';
import { getStoreFrontStates } from './store/storefront-states';
import { MetricsState } from './metrics/metrics.state';

export function getRootStates() {
  return [
    AuthState,
    PageState,
    NavigationState,
    UsersState,
    UsersSecurityState,
    PostState,
    ImagesState,
    ...getStoreFrontStates(),
    MetricsState
  ]
}

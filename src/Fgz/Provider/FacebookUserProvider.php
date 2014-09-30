use FOS\FacebookBundle\Security\User\UserManagerInterface as FacebookUserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\User;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Doctrine\DBAL\Connection;

class FacebookUserProvider implements FacebookUserProviderInterface
{
    private $conn;

    public function __construct(Connection $conn)
    {
        $this->conn = $conn;
    }

    public function loadUserByUsername($uid)
    {
        $stmt = $this->conn->executeQuery('SELECT * FROM users WHERE username = ?', array($uid));

        if (!$user = $stmt->fetch()) {
            throw new UsernameNotFoundException(sprintf('Facebook UID "%s" does not exist.', $uid));
        }

        return new User($user['username'], null, explode(',', $user['roles']), true, true, true, true);
    }

    public function refreshUser(UserInterface $user)
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', get_class($user)));
        }

        return $this->loadUserByUsername($user->getUsername());
    }

    public function createUserFromUid($uid)
    {
        $this->conn->insert('users', array(
            'username' => $uid,
            'roles'    => 'ROLE_USER',
        ));

        return $this->loadUserByUsername($uid);
    }

    public function supportsClass($class)
    {
        return $class === 'Symfony\Component\Security\Core\User\User';
    }
}
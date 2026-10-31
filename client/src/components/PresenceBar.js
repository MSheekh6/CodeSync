function PresenceBar({ users, currentUserId }) {
  const uniqueUsers = users.filter((user, index, list) => list.findIndex((candidate) => candidate.userId === user.userId) === index);
  const visibleUsers = uniqueUsers.slice(0, 5);
  const additionalUsers = uniqueUsers.length - visibleUsers.length;

  return (
    <div className="presence-bar" aria-label={`${uniqueUsers.length} users online`}>
      <span className="presence-status"><b /> {uniqueUsers.length} online</span>
      <div className="presence-avatars">
        {visibleUsers.map((user) => (
          <span className="presence-avatar" key={user.userId} style={{ backgroundColor: user.color }} title={`${user.username}${user.userId === currentUserId ? ' (You)' : ''}`} tabIndex="0">
            {user.username[0].toUpperCase()}
          </span>
        ))}
        {additionalUsers > 0 && <span className="presence-more">+{additionalUsers}</span>}
      </div>
    </div>
  );
}

export default PresenceBar;

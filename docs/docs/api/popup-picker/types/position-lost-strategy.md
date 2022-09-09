# `PositionLostStrategy`

Defines the action taken by the picker if the reference element is lost (and relative position can no longer be updated).

The valid strategies are:

- `none`: The default. No changes are made. If the reference element is lost, in most cases the picker will jump to position x=0, y=0 (the upper left corner). 
- `close`: The picker will close. It can be re-opened again with a different reference element, or if the previous reference element becomes visible again.
- `destroy`: The picker will be destroyed. This is permanent and the picker cannot be opened again.
- `hold`: The previously calculated position is maintained. While the reference element is gone, the picker remains in the same position.

/**
 * @brief The class establishes the structure from the entity Role
 *
 * @param id: string
 * @param title: string
 * @param createdAt: Date
 * @param updatedAt: Date
 *
 * @return void
 *
 * @description The structure contains the data from the scheme Role
 * 
 */

export interface RoleEntity {
    /**
     * @param id: string: The id of the role.
     */
    id: string;

    /**
     * @param title string: The title of the role.
     */
    title: string;

    /**
     * @param createdAt: Date: The date when the role was created.
     */
    createdAt: Date;

    /**
     * @param updatedAt Date: The date when the role was updated.
     */
    updateAt?: Date;
}
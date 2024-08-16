export type DropdownMenuProps = {
  pages: Page[];
};

type Page = {
  id: number;
  title: {
    rendered: string;
  };
};

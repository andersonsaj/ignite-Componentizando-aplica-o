import { ButtonHTMLAttributes, useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { api } from '../services/api';
import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SiderBarProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
  selectedGenreId: number;
  onHandleClickButton: (id: number) => void;
}

export function SideBar({selectedGenreId, onHandleClickButton, ...rest}: SiderBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            selected={selectedGenreId === genre.id}
            onClick={() => onHandleClickButton(genre.id)}
            {...rest}
          />
          ))}   
        </div>

    </nav>
  );
}